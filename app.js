const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3000;
const apiKey = '47db3ea40711dc75be5b80dd33e3459f'; 

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { username, password, confirmPassword, email } = req.body;
    
    if (username.length < 3) {
        return res.status(400).json({ message: 'Nazwa użytkownika musi mieć co najmniej 3 znaki.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Hasło musi mieć co najmniej 6 znaków.' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Hasło musi zawierać co najmniej jedną literę, jedną cyfrę i jeden znak specjalny.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Hasła muszą być takie same.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Podaj prawidłowy adres email.' });
    }

    return res.status(200).json({ message: 'Rejestracja zakończona sukcesem!' });
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`);
        const data = await response.json();
        if (data.cod === 200) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Nie udało się znaleźć pogody dla podanego miasta.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania danych pogodowych.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
