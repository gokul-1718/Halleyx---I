package com.example.workflow.service;

import com.example.workflow.entity.Rule;
import com.example.workflow.repository.RuleRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RuleService {

    private final RuleRepository ruleRepository;

    // ✅ Create Rule with stepId
    public Rule createRule(Long stepId, Rule rule) {
        rule.setStepId(stepId);
        return ruleRepository.save(rule);
    }

    // ✅ Get Rule by ID
    public Rule getRuleById(Long id) {
        return ruleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rule not found"));
    }

    // ✅ Get Rules by Step ID
    public List<Rule> getRulesByStepId(Long stepId) {
        return ruleRepository.findByStepIdOrderByPriorityAsc(stepId);
    }

    // ✅ Update Rule
    public Rule updateRule(Long id, Rule updatedRule) {

        Rule ruleDetails = ruleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rule not found"));

        ruleDetails.setExpression(updatedRule.getExpression());
        ruleDetails.setPriority(updatedRule.getPriority());
        ruleDetails.setNextStepId(updatedRule.getNextStepId());
        ruleDetails.setStepId(updatedRule.getStepId());

        return ruleRepository.save(ruleDetails);
    }

    // ✅ Delete Rule
    public void deleteRule(Long id) {
        Rule rule = ruleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rule not found"));

        ruleRepository.delete(rule);
    }
}
