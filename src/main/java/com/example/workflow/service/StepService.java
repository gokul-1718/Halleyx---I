package com.example.workflow.service;

import com.example.workflow.entity.Step;
import com.example.workflow.entity.Workflow;
import com.example.workflow.repository.StepRepository;
import com.example.workflow.repository.WorkflowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StepService {

    private final StepRepository stepRepository;
    private final WorkflowRepository workflowRepository;

    // ✅ CREATE STEP
    public Step createStep(Long workflowId, Step step) {

        Workflow workflow = workflowRepository.findById(workflowId)
                .orElseThrow(() -> new RuntimeException("Workflow not found"));

        step.setWorkflow(workflow);

        return stepRepository.save(step);
    }

    // ✅ GET STEPS BY WORKFLOW
    public List<Step> getStepsByWorkflowId(Long workflowId) {
        return stepRepository.findByWorkflowId(workflowId);
    }

    // ✅ UPDATE STEP
    public Step updateStep(Long id, Step stepDetails) {

        Step step = stepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Step not found"));

        // 🔥 IMPORTANT FIX (NO description)
        step.setName(stepDetails.getName());
        step.setType(stepDetails.getType());

        return stepRepository.save(step);
    }

    // ✅ DELETE STEP
    public void deleteStep(Long id) {

        Step step = stepRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Step not found"));

        stepRepository.delete(step);
    }
}
