export function accessProtectedData() {
  fetch("/protected", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Données protégées :", data);
      } else {
        alert("Accès refusé : " + data.message);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'accès aux données protégées :", error);
    });
}
