            package com.example.workflow.controller;

    import com.example.workflow.dto.ExecutionRequest;
    import com.example.workflow.dto.ExecutionResponse;
    import com.example.workflow.entity.StepLog;
    import com.example.workflow.repository.StepLogRepository;
    import com.example.workflow.service.ExecutionService;

    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/executions")
    @RequiredArgsConstructor
    @CrossOrigin(origins = "http://localhost:5173")
    public class ExecutionController {

        private final ExecutionService executionService;
        private final StepLogRepository stepLogRepository;

        // ✅ START EXECUTION
        @PostMapping("/{workflowId}")
        public ExecutionResponse startExecution(
                @PathVariable Long workflowId,
                @RequestBody ExecutionRequest request) {
            return executionService.startExecution(workflowId, request);
        }

        // ✅ GET EXECUTION
        @GetMapping("/{id}")
        public ExecutionResponse getExecution(@PathVariable Long id) {
            return executionService.getExecutionById(id);
        }

        // ✅ 🔥 GET EXECUTION LOGS (NEW)
        @GetMapping("/{id}/logs")
        public List<StepLog> getExecutionLogs(@PathVariable Long id) {
            return stepLogRepository.findByExecutionId(id);
        }
    }
