import React from 'react';
import ShowHidePassword from '../../../ShowHidePassword';

class SecurityQuestionsTest extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                answers: {}
            },
            questions: {}
        };

        this.props.doTestLogon(null)
            .then(({questions}) => {
                const answers = {};
                Object.keys(questions).forEach((questionKey) => {
                    answers[questionKey] = '';
                });
                this.setState({
                    form: {answers},
                    questions
                });
            });
    }

    handleChange = (questionKey, event) => {
        const answers = this.state.form.answers;

        this.setState({
            form: {
                answers: {...answers, [questionKey]: event.target.value}
            }
        });
    };

    render() {
        const {form: {answers}, questions} = this.state;

        const questionElements = Object.keys(questions).map((questionKey) => {
            const question = questions[questionKey];
            const answer = answers[questionKey];
            return (
                <ShowHidePassword
                    name={`answer_id_${questionKey}`}
                    onChange={(event) => this.handleChange(questionKey, event)}
                    key={questionKey}
                    label={question}
                    placeholder="Answer"
                    value={answer}
                />
            );
        });

        return (
            <React.Fragment>
                {questionElements}
            </React.Fragment>
        );
    }
}

export default SecurityQuestionsTest;
