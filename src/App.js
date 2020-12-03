import React, { useEffect, useState } from 'react';

export default function App() {
  const [opleidingen, setOpleidingen] = useState([]);
  const [naam, setNaam] = useState([]);
  const [beschrijving, setBeschrijving] = useState([]);
  const [prijs, setPrijs] = useState([]);

  useEffect(() => {
    fetch("/opleidingen", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        setOpleidingen(result);
      },
        (error) => {
          console.log(error);
        }
      )
  }, [])

  const createOpleidingHandler = (event, naam, beschrijving, prijs) => {
    event.preventDefault();
    const opleiding = {
      naam: naam,
      omschrijving: beschrijving,
      prijs: prijs
    };
    fetch("/opleidingen/add", {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opleiding)
    })
      .then(
        (result) => {
          console.log("Result: " + result);
          window.location.reload(false);
        },
        (error) => {
          console.log("Error: " + error);
        }
      )
      .catch(error => {
        console.log("Catch error: " + error)
      })
  }

  const deleteOpleidingHandler = (event, id) => {
    event.preventDefault();
    fetch(`/opleidingen/delete/${id}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(
        (result) => {
          window.location.reload(false);
        },
        (error) => {
          console.log("Error: " + error);
        }
      )
      .catch(error => {
        console.log("Catch error: " + error)
      })
  }

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "naam") {
      setNaam(value);
    } else if (name === "beschrijving") {
      setBeschrijving(value);
    } else if (name === "prijs") {
      setPrijs(value);
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl text-center font-bold py-4">Application Frameworks</h1>
      <div className="border border-black-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">

        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Naam</th>
              <th className="px-4 py-2">Beschrijving</th>
              <th className="px-4 py-2">Prijs</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {opleidingen.map(({ id, naam, omschrijving, prijs }) =>
              <tr key={id}>
                <td className="border px-4 py-2">{naam}</td>
                <td className="border px-4 py-2">{omschrijving}</td>
                <td className="border px-4 py-2">{prijs}</td>
                <td><button
                  className="bg-red-400 hover:bg-red-500 rounded w-full p-2 text-white"
                  onClick={event => {
                    deleteOpleidingHandler(event, id);
                  }}
                >
                  Delete
          </button></td>
              </tr>
            )}
          </tbody>
        </table>

        <h1 className="text-2xl text-center font-bold py-4">Nieuwe opleiding toevoegen</h1>
        <form>
          <label htmlFor="naam" className="block">
            Naam:
        </label>
          <input
            type="text"
            className="my-1 p-1 w-full border"
            name="naam"
            value={naam}
            placeholder="Naam"
            id="naam"
            onChange={event => onChangeHandler(event)}
          />

          <label htmlFor="beschrijving" className="block">
            Beschrijving:
        </label>
          <input
            type="text"
            className="my-1 p-1 w-full border"
            name="beschrijving"
            value={beschrijving}
            placeholder="Beschrijving"
            id="beschrijving"
            onChange={event => onChangeHandler(event)}
          />

          <label htmlFor="prijs" className="block">
            Prijs:
        </label>
          <input
            type="number"
            className="my-1 p-1 w-full border"
            step="0.01"
            name="prijs"
            value={prijs}
            placeholder="Prijs"
            id="prijs"
            onChange={event => onChangeHandler(event)}
          />

          <button
            className="bg-orange-400 hover:bg-orange-500 rounded w-full py-2 text-white"
            onClick={event => {
              createOpleidingHandler(event, naam, beschrijving, prijs);
            }}
          >
            Add opleiding
          </button>
        </form>
      </div>
    </div>
  );
}
