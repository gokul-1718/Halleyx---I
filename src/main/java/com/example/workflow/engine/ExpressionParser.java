package com.example.workflow.engine;

import java.util.Map;

public class ExpressionParser {

    public static Object parseValue(String value, Map<String, Object> context) {
        if (value.startsWith("'") && value.endsWith("'")) {
            return value.substring(1, value.length() - 1);
        } else if (value.matches("\\d+")) {
            return Integer.parseInt(value);
        } else if (value.matches("\\d+\\.\\d+")) {
            return Double.parseDouble(value);
        } else {
            return context.get(value);
        }
    }
}