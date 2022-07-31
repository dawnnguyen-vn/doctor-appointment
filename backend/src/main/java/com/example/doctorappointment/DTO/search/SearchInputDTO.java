package com.example.doctorappointment.DTO.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchInputDTO {
    String input;

    public void removeNonKeywords(){
        String[] seachInput = input.split(" ");
        String result = "";
        for(String s : seachInput){
            if(!s.equalsIgnoreCase("Khám")&&!s.equalsIgnoreCase("bệnh")&&!s.equalsIgnoreCase("chữa"))
                if(!s.equalsIgnoreCase("Bác")&&!s.equalsIgnoreCase("viện")&&!s.equalsIgnoreCase("sĩ")&&!s.equalsIgnoreCase("phòng"))
                result+=s+" ";
        }
        this.input = result.trim();
    }

    public static void main(String[] args) {
        SearchInputDTO searchText = new SearchInputDTO();
        searchText.input = "bệnh viện bạch mai";

        System.out.println( searchText.input);
        searchText.removeNonKeywords();
        System.out.println(searchText.input);
    }
}
