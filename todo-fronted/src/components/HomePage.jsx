import AddNewTodoForm from "./AddNewTodoForm";
import TodosList from "./TodosList";
import { useAuth } from "../hooks/auth.hook";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const auth = useAuth(AuthContext);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* APP HEADING / TITLE */}
        <h1 className="my-5 text-4xl font-bold text-black">Todo App</h1>
        <button 
          type="button" 
          className="bg-blue-500 text-white rounded-sm shadow-md w-full my-2 py-2 transition-all duration-100 hover:bg-blue-600"
          onClick={() => {
            auth.logout();
            document.location.href = '/';
          }}
        >
          Log out
        </button>

        {/* ADD NEW TODOS FORM COMPONENT */}
        <AddNewTodoForm />

        {/* TODOS LIST COMPONENTS */}
        <TodosList />
      </div>
    </div>
  );
};

export default HomePage;
