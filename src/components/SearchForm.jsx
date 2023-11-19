import Wrapper from "../assets/wrappers/SearchForm";
import { Form, useNavigation } from "react-router-dom";


const SearchForm = ({ searchTerm }) => {
    // console.log(searchTerm);
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    return (
        <Wrapper>
            <Form className="form">
                <input type="search" name="search" className="form-input" defaultValue={searchTerm} placeholder="Do you want a drink..." />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>{isSubmitting ? 'searching...' : 'search'}</button>

            </Form>
        </Wrapper>
    )
}
export default SearchForm