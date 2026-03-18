package com.example.workflow.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StepLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String inputData;

    private String outputData;

    private String errorMessage;

    private LocalDateTime executedAt;

    @Enumerated(EnumType.STRING)
    private StepStatus status;

    // 🔥 FIX
    @ManyToOne
    @JoinColumn(name = "execution_id")
    @JsonBackReference
    private Execution execution;

    // 🔥 FIX
    @ManyToOne
    @JoinColumn(name = "step_id")
    @JsonBackReference
    private Step step;

    public enum StepStatus {
        STARTED, COMPLETED, FAILED, SKIPPED
    }
}
