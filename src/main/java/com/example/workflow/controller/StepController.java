package com.example.workflow.controller;

import com.example.workflow.entity.Step;
import com.example.workflow.service.StepService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/workflows/{workflowId}/steps")
public class StepController {

    private final StepService stepService;

    // ✅ CREATE STEP
    @PostMapping
    public Step createStep(@PathVariable Long workflowId, @RequestBody Step step) {
        return stepService.createStep(workflowId, step);
    }

    // ✅ GET STEPS
    @GetMapping
    public List<Step> getSteps(@PathVariable Long workflowId) {
        return stepService.getStepsByWorkflowId(workflowId);
    }

    // ✅ UPDATE STEP
    @PutMapping("/{id}")
    public Step updateStep(@PathVariable Long id, @RequestBody Step step) {
        return stepService.updateStep(id, step);
    }

    // ✅ DELETE STEP
    @DeleteMapping("/{id}")
    public void deleteStep(@PathVariable Long id) {
        stepService.deleteStep(id);
    }
}
