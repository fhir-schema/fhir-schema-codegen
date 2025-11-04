package de.solutio.fhir.models.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ResourceTest {

    @Test
    public void json() throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        final Task task = Task.builder().intent(Task.TaskIntent.PLAN).status(Task.TaskStatus.REQUESTED).build();
        final String json = objectMapper.writeValueAsString(task);
        assertThat(json).isNotBlank();
        final Task read = objectMapper.readValue(json, Task.class);
        assertThat(read).isEqualTo(task);
    }
}
