
export const onAxiosReq = (req,  url, inputValue, condition) => {
	req(`http://localhost:2000/api/todos/${url}`, {task: inputValue, done: condition})
		.then(res => {

		}).catch(err => {
		console.log('error',err);
	});
}