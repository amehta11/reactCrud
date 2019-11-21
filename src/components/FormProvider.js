import { reduxForm } from "redux-form";
import validate from "./Helpers/Validator";

const toRenderProp = ({ children, ...rest }) => children(rest);

export default reduxForm({
    validate
})(toRenderProp);
