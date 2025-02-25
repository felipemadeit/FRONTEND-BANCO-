

  // El código directamente aquí o importado
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: formDataObject.email,
                    password: formDataObject.password
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Login failed: ${errorText}`);
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            localStorage.setItem('token', data.token);
            // Redirigir al usuario o mostrar mensaje de éxito
            window.location.href = '/dashboard'; // o donde quieras redirigir

        } catch (error) {
            console.error("Error en el login:", error);
            // Mostrar mensaje de error al usuario
        }
    });
});
