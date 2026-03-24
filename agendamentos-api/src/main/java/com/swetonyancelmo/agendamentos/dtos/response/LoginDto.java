package com.swetonyancelmo.agendamentos.dtos.response;

public record LoginDto(
        String token,
        String name,    
        String email
) {
}
