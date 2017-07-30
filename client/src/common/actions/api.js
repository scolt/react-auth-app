import api from '../../utility/http';

export default ({model, action, method = 'get'}) => {
    return (dispatch, getState) => {
        const payload = method === 'post' ? getState()[model] && getState()[model].payload : null;
        const type = `${model}#${action}`;

        dispatch({
            type: 'startProcessing',
            origin: type
        });

        const options = {
            method: method.toUpperCase()
        };

        if (payload) options.body = payload;

        const successCall = (result) => {
            dispatch({
                type: 'endProcessing',
                origin: type,
                result: result
            });
        };

        const errorCall = (error) => {
            dispatch({
                type: 'errProcessing',
                origin: type,
                result: error
            });
        };

        api.request(`/${model}/${action}`, options).then((result) => {
            result.status < 400 ? successCall() : errorCall(result.statusText);
        }, (error) => {
            errorCall(error);
        });
    };
};
