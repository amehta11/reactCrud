// Helper function to validate input params

export default function validate (values) {
    const { name, email, phone } = values;
    const errors = {};
    if (!name || name.trim() === '') {
      errors.name = "Full name is a required.";
    }

    /* 
     * email validation regex 
     * example : Daniela_Hammes@yahoo.com 
     */
    if (!email || email.trim() === '') {
      errors.email = "Email address is a required.";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        errors.email = "Invalid email address.";
    }
 
    /*
     * Phone validation regex,  
     * Allowing finnish phone number starting with 0 and 9 digits afterwards
     * example : Daniela_Hammes@yahoo.com 
     */
    if (!phone || phone.trim() === '') {
      errors.phone = "Phone number is a required.";
    }else if (!/^0{1}[0-9]{9}$/.test(phone)) {
      errors.phone = "Invalid finnish phone number.";
    }

    return errors;
}