package com.example.workflow.service;

import com.example.workflow.dto.ExecutionRequest;
import com.example.workflow.dto.ExecutionResponse;
import com.example.workflow.entity.*;
import com.example.workflow.repository.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ExecutionService {

    private final ExecutionRepository executionRepository;
    private final WorkflowRepository workflowRepository;
    private final StepRepository stepRepository;
    private final StepLogRepository stepLogRepository;
    private final RuleRepository ruleRepository;
    private final RuleEngineService ruleEngineService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // 🚀 START EXECUTION
    public ExecutionResponse startExecution(Long workflowId, ExecutionRequest request) {

        // 🔥 1. CHECK WORKFLOW
        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new RuntimeException("Workflow not found with id: " + workflowId));

        // 🔥 2. AUTO SET START STEP
        if (workflow.getStartStepId() == null) {

            List<Step> steps = stepRepository.findByWorkflowId(workflowId);

            if (steps == null || steps.isEmpty()) {
                throw new RuntimeException("No steps found in workflow");
            }

            Long firstStepId = steps.get(0).getId();
            workflow.setStartStepId(firstStepId);
            workflowRepository.save(workflow);

            System.out.println("⚡ Auto-set startStepId: " + firstStepId);
        }

        // 🔥 3. SAFE REQUEST
        if (request == null || request.getInputData() == null) {
            request = new ExecutionRequest();
            request.setInputData("{}");
        }

        // 🔥 4. CREATE EXECUTION
        Execution execution = new Execution();
        execution.setWorkflow(workflow);
        execution.setWorkflowVersion(
                workflow.getVersion() == null ? 1 : workflow.getVersion()
        );
        execution.setStatus(Execution.ExecutionStatus.PENDING);
        execution.setInputData(request.getInputData());
        execution.setCurrentStepId(workflow.getStartStepId());
        execution.setRetries(0);

        execution = executionRepository.save(execution);

        // 🔥 5. EXECUTE
        executeWorkflow(execution);

        return mapToResponse(execution);
    }

    // 📥 GET EXECUTION
    public ExecutionResponse getExecutionById(Long id) {

        Execution execution = executionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Execution not found with id: " + id));

        return mapToResponse(execution);
    }

    // 🔄 EXECUTION ENGINE
    private void executeWorkflow(Execution execution) {

        execution.setStatus(Execution.ExecutionStatus.RUNNING);
        executionRepository.save(execution);

        try {

            // 🔥 SAFE JSON PARSE
            Map<String, Object> context;
            try {
                context = parseJsonToMap(execution.getInputData());
            } catch (Exception e) {
                context = new HashMap<>();
            }

            Long currentStepId = execution.getCurrentStepId();

            while (currentStepId != null) {

                Long stepId = currentStepId;

                System.out.println("👉 Executing Step ID: " + stepId);

                // 🔥 SAFE STEP FETCH
                Optional<Step> stepOptional = stepRepository.findById(stepId);

                if (stepOptional.isEmpty()) {
                    throw new RuntimeException("Step not found in DB: " + stepId);
                }

                Step currentStep = stepOptional.get();

                // 🔥 CREATE LOG
                StepLog stepLog = new StepLog();
                stepLog.setExecution(execution);
                stepLog.setStep(currentStep);
                stepLog.setStatus(StepLog.StepStatus.STARTED);
                stepLog.setInputData(execution.getInputData());

                stepLog = stepLogRepository.save(stepLog);

                // 🔥 EXECUTE STEP
                executeStep(currentStep, context);

                // 🔥 RULE ENGINE
                List<Rule> rules = ruleRepository.findByStepIdOrderByPriorityAsc(stepId);

                Long nextStepId = null;

                if (rules != null && !rules.isEmpty()) {
                    for (Rule rule : rules) {
                        boolean result = ruleEngineService.evaluateRule(rule, context);
                        if (result) {
                            nextStepId = rule.getNextStepId();
                            break;
                        }
                    }
                }

                // 🔥 COMPLETE LOG
                stepLog.setStatus(StepLog.StepStatus.COMPLETED);
                stepLog.setOutputData(mapToJson(context));
                stepLogRepository.save(stepLog);

                // 🔥 END CONDITION
                if (nextStepId == null) {
                    System.out.println("✅ Workflow completed");
                    break;
                }

                currentStepId = nextStepId;
                execution.setCurrentStepId(currentStepId);
                executionRepository.save(execution);
            }

            execution.setStatus(Execution.ExecutionStatus.COMPLETED);

        } catch (Exception e) {

            System.out.println("🔥 ERROR OCCURRED:");
            e.printStackTrace();

            execution.setStatus(Execution.ExecutionStatus.FAILED);
            executionRepository.save(execution);

            // 🔥 VERY IMPORTANT (show real error to frontend)
            throw new RuntimeException(e.getMessage());
        }

        executionRepository.save(execution);
    }

    // ⚙️ STEP LOGIC
    private void executeStep(Step step, Map<String, Object> context) {

        if (step.getType() == Step.StepType.TASK) {
            context.put("taskExecuted", true);
        }
        else if (step.getType() == Step.StepType.APPROVAL) {
            context.put("approved", true);
        }
        else if (step.getType() == Step.StepType.NOTIFICATION) {
            context.put("notificationSent", true);
        }
    }

    // 🧠 JSON → MAP
    private Map<String, Object> parseJsonToMap(String json) {
        try {
            if (json == null || json.isEmpty()) {
                return new HashMap<>();
            }
            return objectMapper.readValue(json,
                    new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

    // 🧠 MAP → JSON
    private String mapToJson(Map<String, Object> map) {
        try {
            return objectMapper.writeValueAsString(map);
        } catch (Exception e) {
            return "{}";
        }
    }

    // 🔄 RESPONSE
    private ExecutionResponse mapToResponse(Execution execution) {

        ExecutionResponse response = new ExecutionResponse();

        response.setId(execution.getId());

        if (execution.getWorkflow() != null) {
            response.setWorkflowId(execution.getWorkflow().getId());
        }

        response.setWorkflowVersion(execution.getWorkflowVersion());
        response.setStatus(execution.getStatus().toString());
        response.setInputData(execution.getInputData());
        response.setCurrentStepId(execution.getCurrentStepId());
        response.setRetries(execution.getRetries());
        response.setCreatedAt(execution.getCreatedAt());
        response.setUpdatedAt(execution.getUpdatedAt());

        return response;
    }
}