package com.example.workflow.controller;

import com.example.workflow.dto.WorkflowRequest;
import com.example.workflow.dto.WorkflowResponse;
import com.example.workflow.service.WorkflowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workflows")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class WorkflowController {

    private final WorkflowService workflowService;

    @PostMapping
    public ResponseEntity<WorkflowResponse> createWorkflow(@RequestBody WorkflowRequest request) {
        WorkflowResponse response = workflowService.createWorkflow(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<WorkflowResponse>> getAllWorkflows() {
        List<WorkflowResponse> responses = workflowService.getAllWorkflows();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkflowResponse> getWorkflowById(@PathVariable Long id) {
        WorkflowResponse response = workflowService.getWorkflowById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkflowResponse> updateWorkflow(@PathVariable Long id, @RequestBody WorkflowRequest request) {
        WorkflowResponse response = workflowService.updateWorkflow(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkflow(@PathVariable Long id) {
        workflowService.deleteWorkflow(id);
        return ResponseEntity.noContent().build();
    }
}