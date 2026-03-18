package com.example.workflow.service;

import com.example.workflow.entity.Rule;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RuleEngineService {

    public boolean evaluateRule(Rule rule, Map<String, Object> context) {

        String expression = rule.getExpression();

        // 🔥 BASIC LOGIC

        if (expression == null || expression.isEmpty()) {
            return false;
        }

        // CASE 1: always true
        if (expression.equalsIgnoreCase("true")) {
            return true;
        }

        // CASE 2: always false
        if (expression.equalsIgnoreCase("false")) {
            return false;
        }

        // CASE 3: amount > 1000
        if (expression.contains(">")) {
            String[] parts = expression.split(">");

            String key = parts[0].trim();
            double value = Double.parseDouble(parts[1].trim());

            Object actual = context.get(key);

            if (actual instanceof Number) {
                return ((Number) actual).doubleValue() > value;
            }
        }

        // CASE 4: amount < 1000
        if (expression.contains("<")) {
            String[] parts = expression.split("<");

            String key = parts[0].trim();
            double value = Double.parseDouble(parts[1].trim());

            Object actual = context.get(key);

            if (actual instanceof Number) {
                return ((Number) actual).doubleValue() < value;
            }
        }

        return false;
    }
}
