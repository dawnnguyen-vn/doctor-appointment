package com.example.doctorappointment.utility;

public class Config {
    public enum ROLE {
        ADMIN("ADMIN"),
        DOCTOR("DOCTOR"),
        PATIENT("PATIENT"),
        CLINIC("CLINIC");
        private final String value;
        ROLE(String s) {
            this.value = s;
        }
        public String getValue(){
            return  this.value;
        }
    }
    public enum STATUS{
        JOIN,
        MESSAGE,
        LEAVE
    }
    public enum CONFIG {
        //SECRET((Math.random()*9999)+" This is secret key");
        SECRET(" This is secret key");
        private final String value;
        CONFIG(String s) {
            this.value = s;
        }
        public String getValue(){
            return  this.value;
        }
    }
}
