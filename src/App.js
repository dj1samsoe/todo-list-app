import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    text: "",
    date: "",
    index: null,
  });

  const openEditModal = (index, text, date) => {
    setEditedTask({ text, date, index });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    if (editedTask.text.trim() !== "" && editedTask.date !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editedTask.index] = {
        text: editedTask.text,
        date: editedTask.date,
        completed: updatedTasks[editedTask.index].completed,
      };
      setTasks(updatedTasks);
      setShowEditModal(false);
    }
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleDateChange = (event) => {
    setNewTaskDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== "" && newTaskDate !== "") {
      setTasks([
        ...tasks,
        { text: newTask, date: newTaskDate, completed: false },
      ]);
      setNewTask("");
      setNewTaskDate("");
    }
  };

  const handleDelete = (index) => {
    setShowConfirmation(true);
    setTaskToDelete(index);
  };

  const handleConfirmDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskToDelete, 1);
    setTasks(updatedTasks);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setTaskToDelete(null);
  };

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const getDaysDiff = (dateA, dateB) => {
    const timeDiff = new Date(dateB).getTime() - new Date(dateA).getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container min-w-full min-h-screen py-32 px-16 bg-gray-900">
      <h1 className="text-4xl text-white text-center font-bold mb-16">
        To-do List App
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-y-3 mb-10 px-4 justify-center text-white"
      >
        <input
          type="text"
          value={newTask}
          onChange={handleChange}
          placeholder="Masukkan tugas baru"
          className="border border-gray-300 bg-gray-900 px-4 py-2 mr-2"
        />
        <input
          type="date"
          value={newTaskDate}
          onChange={handleDateChange}
          className="border border-gray-300 bg-gray-900 p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-900 px-4 py-2 rounded"
        >
          Tambahkan
        </button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex items-center text-white justify-between border rounded p-2 mb-2"
          >
            <div
              className={`flex items-center ${
                task.completed ? "line-through" : ""
              }`}
            >
              {/* Improved checkbox */}
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleComplete(index)}
                    className="sr-only mr-8"
                  />
                  <div className="block bg-white border border-gray-300 w-6 h-6 rounded-md shadow-sm"></div>
                  {task.completed && (
                    <svg
                      className="absolute w-4 h-4 text-blue-500 fill-current left-1 top-1"
                      viewBox="0 0 20 20"
                    >
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <div>{task.text}</div>
                  <div className="text-sm text-gray-500">{task.date}</div>
                  {task.completed ? (
                    <div className="text-sm text-gray-500">Tugas Selesai!</div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      {getDaysDiff(new Date(), task.date) > 0
                        ? `${getDaysDiff(new Date(), task.date)} hari tersisa`
                        : "Due today"}
                    </div>
                  )}
                </div>
              </label>
            </div>
            <div>
              <button
                onClick={() => openEditModal(index, task.text, task.date)}
                className="text-blue-500 focus:text-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 focus:text-red-600"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editedTask.text}
              onChange={(e) =>
                setEditedTask({ ...editedTask, text: e.target.value })
              }
              placeholder="Enter a new task"
              className="border border-gray-300 p-2 mb-2 w-full"
            />
            <input
              type="date"
              value={editedTask.date}
              onChange={(e) =>
                setEditedTask({ ...editedTask, date: e.target.value })
              }
              className="border border-gray-300 p-2 w-full"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                Simpan
              </button>
              <button
                onClick={handleEditCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <p className="text-lg font-bold mb-10">
              Anda yakin ingin menghapus tugas ini?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Hapus
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-white px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
