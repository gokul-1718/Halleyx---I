package com.example.workflow.repository;

import com.example.workflow.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RuleRepository extends JpaRepository<Rule, Long> {

    List<Rule> findByStepIdOrderByPriorityAsc(Long stepId);
}
