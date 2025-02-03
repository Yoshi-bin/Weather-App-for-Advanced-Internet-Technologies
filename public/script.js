document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message');

  // Walidacja długości nazwy użytkownika (minimum 3 znaki)
  if (username.length < 3) {
      message.textContent = 'Nazwa użytkownika musi mieć co najmniej 3 znaki.';
      return;
  }

  // Walidacja długości hasła (minimum 6 znaków)
  if (password.length < 6) {
      message.textContent = 'Hasło musi mieć co najmniej 6 znaków.';
      return;
  }

  // Walidacja zawartości hasła (litery, liczby i znak specjalny)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!passwordRegex.test(password)) {
      message.textContent = 'Hasło musi zawierać co najmniej jedną literę, jedną cyfrę i jeden znak specjalny.';
      return;
  }

  // Sprawdzanie czy hasła są zgodne
  if (password !== confirmPassword) {
      message.textContent = 'Hasła muszą być takie same.';
      return;
  }

  // Walidacja email przy użyciu wyrażenia regularnego
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      message.textContent = 'Podaj prawidłowy adres email.';
      return;
  }

  message.textContent = 'Rejestracja zakończona sukcesem!';
});

document.getElementById('weatherForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const city = document.getElementById('city').value;
  const weather = document.getElementById('weather');
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=47db3ea40711dc75be5b80dd33e3459f&units=metric&lang=pl`)
      .then(response => response.json())
      .then(data => {
          if (data.cod === 200) {
              weather.innerHTML = `
                  <h3>Pogoda w ${data.name}</h3>
                  <p>Temperatura: ${data.main.temp} °C</p>
                  <p>Opis: ${data.weather[0].description}</p>
              `;
          } else {
              weather.textContent = 'Nie udało się znaleźć pogody dla podanego miasta.';
          }
      })
      .catch(error => {
          weather.textContent = 'Wystąpił błąd podczas pobierania danych pogodowych.';
      });
});
