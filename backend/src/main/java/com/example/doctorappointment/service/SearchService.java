package com.example.doctorappointment.service;

import com.example.doctorappointment.DTO.search.SearchOutputDTO;

public interface SearchService {
    public SearchOutputDTO search();
    public SearchOutputDTO search(String keyword);
}
