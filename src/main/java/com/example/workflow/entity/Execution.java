package com.example.workflow.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Execution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String inputData;

    private Long currentStepId;

    private int retries;

    @Enumerated(EnumType.STRING)
    private ExecutionStatus status;

    private Integer workflowVersion;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private Workflow workflow;

    // 🔥 FIX (avoid infinite loop)
    @OneToMany(mappedBy = "execution", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<StepLog> stepLogs;

    public enum ExecutionStatus {
        PENDING, RUNNING, COMPLETED, FAILED, CANCELLED
    }
}
