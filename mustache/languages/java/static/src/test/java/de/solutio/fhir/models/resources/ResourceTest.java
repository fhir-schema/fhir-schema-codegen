package de.solutio.fhir.models.resources;

import static de.solutio.fhir.models.complex_types.CodeableConceptDTO.codeableConceptDtoBuilder;
import static de.solutio.fhir.models.complex_types.ElementDTO.elementDtoBuilder;
import static de.solutio.fhir.models.complex_types.ExtensionDTO.extensionDtoBuilder;
import static de.solutio.fhir.models.resources.TaskDTO.TaskInputDTO.taskInputDtoBuilder;
import static de.solutio.fhir.models.resources.TaskDTO.TaskIntentDTO;
import static de.solutio.fhir.models.resources.TaskDTO.TaskStatusDTO;
import static de.solutio.fhir.models.resources.TaskDTO.taskDtoBuilder;
import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import org.junit.jupiter.api.Test;

class ResourceTest {

    @Test
    public void json() throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        final TaskDTO task =
                taskDtoBuilder()
                        .description("some description")
                        .intent(TaskIntentDTO.PLAN)
                        .status(TaskStatusDTO.REQUESTED)
                        .input(taskInputDtoBuilder().type(codeableConceptDtoBuilder().build()).build())
                        .build();
        final String json = objectMapper.writeValueAsString(task);
        assertThat(json).isNotBlank();
        final TaskDTO read = objectMapper.readValue(json, TaskDTO.class);
        assertThat(read).isEqualTo(task);

        final TaskDTO taskWithExtension =
                task.toBuilder()
                        .descriptionElement(elementDtoBuilder()
                                .extension(extensionDtoBuilder().url(URI.create("https://www.google.com")).build())
                                .build())
                        .addExtension(extensionDtoBuilder().url(URI.create("https://www.google.com")).build())
                        .build();
        assertThat(taskWithExtension.description()).isEqualTo(task.description());
        assertThat(taskWithExtension.intent()).isEqualTo(task.intent());
        assertThat(taskWithExtension.status()).isEqualTo(task.status());
        final String jsonWithExtension = objectMapper.writeValueAsString(taskWithExtension);
        final TaskDTO readWithExtension = objectMapper.readValue(jsonWithExtension, TaskDTO.class);
        assertThat(readWithExtension).isEqualTo(taskWithExtension);
    }
}
