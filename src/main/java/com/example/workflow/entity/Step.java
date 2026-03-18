package com.example.workflow.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private StepType type;

    @ManyToOne
    @JoinColumn(name = "workflow_id")
    private Workflow workflow;

    // 🔥 FIX
    @OneToMany(mappedBy = "step", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<StepLog> stepLogs;

    public enum StepType {
        TASK, APPROVAL, NOTIFICATION
    }
}
