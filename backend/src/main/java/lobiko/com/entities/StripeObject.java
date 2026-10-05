package lobiko.com.entities;

import lombok.Data;

@Data
public class StripeObject {


    private int amount;
    private String paymentMethodId;

}
