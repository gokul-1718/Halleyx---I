package com.example.workflow.service;

import com.example.workflow.dto.WorkflowRequest;
import com.example.workflow.dto.WorkflowResponse;
import com.example.workflow.entity.Workflow;
import com.example.workflow.repository.WorkflowRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private final WorkflowRepository workflowRepository;

    public WorkflowResponse createWorkflow(WorkflowRequest request) {
        Workflow workflow = new Workflow();
        workflow.setName(request.getName());
        workflow.setInputSchema(request.getInputSchema());
        workflow.setStartStepId(request.getStartStepId());
        workflow = workflowRepository.save(workflow);
        return mapToResponse(workflow);
    }

    public List<WorkflowResponse> getAllWorkflows() {
        return workflowRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public WorkflowResponse getWorkflowById(Long id) {
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workflow not found"));
        return mapToResponse(workflow);
    }

    public WorkflowResponse updateWorkflow(Long id, WorkflowRequest request) {
        Workflow workflow = workflowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workflow not found"));
        workflow.setName(request.getName());
        workflow.setInputSchema(request.getInputSchema());
        workflow.setStartStepId(request.getStartStepId());
        workflow.setVersion(workflow.getVersion() + 1);
        workflow = workflowRepository.save(workflow);
        return mapToResponse(workflow);
    }

    public void deleteWorkflow(Long id) {
        workflowRepository.deleteById(id);
    }

    private WorkflowResponse mapToResponse(Workflow workflow) {
        WorkflowResponse response = new WorkflowResponse();
        response.setId(workflow.getId());
        response.setName(workflow.getName());
        response.setInputSchema(workflow.getInputSchema());
        response.setStartStepId(workflow.getStartStepId());
        response.setVersion(workflow.getVersion());
        response.setCreatedAt(workflow.getCreatedAt());
        response.setUpdatedAt(workflow.getUpdatedAt());
        return response;
    }
}