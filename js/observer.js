export function observer(targets) {
  const options = {
    threshold: 0, // 50% de visibilité
  };
  //cette partie sert à faire apparaitre les elements ciblés lors du scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
      } else {
        entry.target.classList.forEach((className) => {
          // Vérifier si la classe commence par 'invisible_'
          if (className.startsWith("invisible_")) {
            // Supprimer la classe
            entry.target.classList.remove(className);
          }
        });
        entry.target.style.transition = "0.8s";
      }
    });
  }, options);

  for (const target of targets) {
    observer.observe(target);
  }
}
