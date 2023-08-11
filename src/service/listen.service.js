

// Define la función para actualizar el estado visual de las tareas
const updateTaskStatus = (taskName, completed) => {
    const taskElement = document.querySelector(`[data-task="${taskName}"]`);
    if (completed) {
      taskElement.classList.add('completed');
    } else {
      taskElement.classList.remove('completed');
    }
  };
  
  // Agrega listeners a las tareas para actualizar el estado
  document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
  
    tasks.forEach(task => {
      task.addEventListener('click', async () => {
        const taskName = task.textContent;
  
        // Simula una solicitud al servidor (ajusta esto según tu lógica)
        const isTaskCompleted = await simulateServerRequest(taskName);
  
        if (isTaskCompleted) {
          updateTaskStatus(taskName, true);
        } else {
          updateTaskStatus(taskName, false);
        }
      });
    });
  
    // Simulación de solicitud al servidor (cambia esto según tu lógica real)
    async function simulateServerRequest(taskName) {
      return new Promise(resolve => {
        setTimeout(() => {
          // Aquí simula si la tarea se completó o no en el servidor
          const isCompleted = Math.random() < 0.5;
          resolve(isCompleted);
        }, 1000); // Simula un retraso de 1 segundo
      });
    }
  });
  