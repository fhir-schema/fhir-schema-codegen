package de.solutio.fhir.models.resources;

import static de.solutio.fhir.models.resources.Task.TaskInput;
import static de.solutio.fhir.models.resources.Task.TaskIntent;
import static de.solutio.fhir.models.resources.Task.TaskStatus;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.solutio.fhir.models.complex_types.CodeableConcept;
import org.junit.jupiter.api.Test;

class ResourceTest {

    @Test
    public void json() throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        final Task task = Task.builder()
                .intent(TaskIntent.PLAN)
                .status(TaskStatus.REQUESTED)
                .input(TaskInput.builder().type(CodeableConcept.builder().build()).build())
                .build();
        final String json = objectMapper.writeValueAsString(task);
        assertThat(json).isNotBlank();
        final Task read = objectMapper.readValue(json, Task.class);
        assertThat(read).isEqualTo(task);
    }
}
