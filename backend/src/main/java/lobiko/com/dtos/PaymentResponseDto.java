package lobiko.com.dtos;

import lombok.Data;

@Data
public class PaymentResponseDto {

        private String id;
        private String clientSecret;

        public PaymentResponseDto(String id, String clientSecret) {
            this.id = id;
            this.clientSecret = clientSecret;
        }
}
