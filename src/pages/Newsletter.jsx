import { toast } from "react-toastify"
import styled from "styled-components"
import { Form, redirect, useNavigation } from "react-router-dom"
import axios from "axios";

const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
    // * recuperamos la información del submit
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    // * realizamos el POST al servidor con la información recuperada
    try {
        await axios.post(newsletterUrl, data)
        toast.success('Thanks for subscribe...')
        return redirect('/')

    } catch (error) {
        const msg = (error?.response?.data?.msg)
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        toast.error(msg)
        return error
    }

}

const Newsletter = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'
    return (
        <Wrapper>
            <Form className="form" method="POST">
                <h4>our newsletter</h4>
                {/* name */}
                <div className="form-row">
                    <label htmlFor="name" className="form-label">name</label>
                    <input type="text" className="form-input" name="name" id="name" required />
                </div>
                {/* lastName */}
                <div className="form-row">
                    <label htmlFor="lastName" className="form-label">last name</label>
                    <input type="text" className="form-input" name="lastName" id="lastName" required />
                </div>
                {/* email */}
                <div className="form-row">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-input" name="email" id="email" defaultValue='test@test.com' required />
                </div>
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>{isSubmitting ? 'submitting' : 'submit'}</button>
            </Form>
        </Wrapper>
    )
}
export default Newsletter

const Wrapper = styled.div`
form h4{
    text-align:center;
    margin-bottom:2rem;
}
form button{
    margin-top:0.5rem;
}
`;