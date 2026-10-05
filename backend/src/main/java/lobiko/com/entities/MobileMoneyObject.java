package lobiko.com.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class MobileMoneyObject {
    double amount;
    String currency;
    String provider;
    String country_code;
    String phone_number;
    String order_id;
    String callback_url;
}
