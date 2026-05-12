import React,{ useState,ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";


const SignInForm: React.FC = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Typed events for HTML Input elements
    const onEmailChanged = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onPasswordChanged = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const onSignInClicked = (): void => {
        if (email && password) {
            // dispatch(signInAction({ email, password }));
        }
    };

    return (
        // Your JSX here
        <div />
    );
};





const AddPostForm = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)