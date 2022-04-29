package com.example.doctorappointment.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarkdownDTO {
    int id;
    String contentHTML;
    String contentMarkdown;
    String description;
}
