import api from "./axios";

export class TodoService {
    async createTodo({title, content}, collectionId) {
        try {
            return await api.post(`/todos/${collectionId}`, {
                title,
                content
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getTodoById(todoId) {
        try {
            return await api.get(`/todos/${todoId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async updateTodo({title, content}, todoId) {
        try {
            return await api.put(`/todos/${todoId}`, {
                title,
                content
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async deleteTodo(todoId) {
        try {
            return await api.delete(`/todos/${todoId}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getTodosByCollectionId(collectionId, completed) {
        try {
            if( completed === undefined) {
                return await api.get(`/todos/getTodos/${collectionId}`);
            }
            return await api.get(`/todos/getTodos/${collectionId}?completed=${completed}`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async toggleTodoCompletion(todoId) {
        try {
            return await api.patch(`/todos/${todoId}/toggle`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async shareTodo(todoId, username) {
        try {
            return await api.patch(`/todos/${todoId}/share`, { username });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async unshareTodo(todoId, username) {
        try {
            return await api.patch(`/todos/${todoId}/unshare`, { username });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const todoService = new TodoService();
export default todoService;