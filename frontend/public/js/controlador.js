//Cuando deje de utilizar local storage elimine todo esto hasda donde indique el comentario
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

// var categorias = [];
// (() => {
//   //Este arreglo es para generar textos de prueba
//   let textosDePrueba = [
//     "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
//     "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
//     "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
//     "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
//     "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum.",
//   ];

//   //Genera dinamicamente los JSON de prueba para esta evaluacion,
//   //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

//   let contador = 1;
//   for (let i = 0; i < 5; i++) {
//     //Generar 5 categorias
//     let categoria = {
//       nombreCategoria: "Categoria " + i,
//       descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
//       aplicaciones: [],
//     };
//     for (let j = 0; j < 10; j++) {
//       //Generar 10 apps por categoria
//       let aplicacion = {
//         codigo: contador,
//         nombre: "App " + contador,
//         descripcion: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
//         icono: `img/app-icons/${contador}.webp`,
//         instalada: contador % 3 == 0 ? true : false,
//         app: "app/demo.apk",
//         calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
//         descargas: 1000,
//         precio: Math.round(Math.random() * (5 - 1), 2) + 1,
//         desarrollador: `Desarrollador ${(i + 1) * (j + 1)}`,
//         imagenes: [
//           "img/app-screenshots/1.webp",
//           "img/app-screenshots/2.webp",
//           "img/app-screenshots/3.webp",
//         ],
//         comentarios: [
//           {
//             comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
//             calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
//             fecha: "12/12/2012",
//             usuario: "Juan",
//           },
//           {
//             comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
//             calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
//             fecha: "12/12/2012",
//             usuario: "Pedro",
//           },
//           {
//             comentario: textosDePrueba[Math.floor(Math.random() * (5 - 1))],
//             calificacion: Math.floor(Math.random() * (5 - 1)) + 1,
//             fecha: "12/12/2012",
//             usuario: "Maria",
//           },
//         ],
//       };
//       contador++;
//       categoria.aplicaciones.push(aplicacion);
//     }
//     categorias.push(categoria);
//   }

//   console.log(categorias);
// })();

// var localStorage = window.localStorage;
// localStorage.clear();
// for (let i = 0; i < categorias.length; i++) {
//   localStorage.setItem(i, JSON.stringify(categorias[i]));
// }

// for (let i = 0; i < localStorage.length; i++) {
//   let categoria = JSON.parse(localStorage.getItem(localStorage.key(i)));
//   $("#categoria").append(
//     `<option value="${localStorage.key(i)}">${
//       categoria.nombreCategoria
//     }</option>`
//   );
//   imprimirAplicaciones(categorias[i]);
// }
//Hasta aquí
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
var categorias = [];
const getCategorias = async () => {
  res = await fetch("http://localhost:8888/api/categorias").catch((err) =>
    console.log("No se obtuvieron las categorias", err)
  );
  categorias = await res.json();
  console.log(categorias);
  // imprimirAplicaciones(categorias[0]);
  mostrarCategoriasSelect(categorias);
};

getCategorias();

function mostrarCategoriasSelect(categorias) {
  for (let i = 0; i < categorias.length; i++) {
    let categoria = categorias[i];
    $("#categoria").append(
      `<option value="${i}">${categoria.nombreCategoria}</option>`
    );
  }
  $("#categoria").val(0);
  imprimirAplicaciones(categorias[$("#categoria").val()]);
}

function imprimirAplicaciones(categoria) {
  for (let j = 0; j < categoria.aplicaciones.length; j++) {
    let estrellas = "";
    for (let k = 0; k < categoria.aplicaciones[j].calificacion; k++) {
      estrellas += '<i class="fas fa-star"></i>';
    }
    for (let k = 0; k < 5 - categoria.aplicaciones[j].calificacion; k++) {
      estrellas += '<i class="far fa-star"></i>';
    }

    $("#aplicaciones").append(
      `<div class="col-lg-2 col-md-3 col-6">
                <div class="card shadow" onclick="detalleAplicacion('${categoria.aplicaciones[j]._id}')">
                    <div class="card-body">
                        <img src="${categoria.aplicaciones[j].icono}" class="img-fluid">
                        <div class="texto-aplicacion">${categoria.aplicaciones[j].nombre}</div>
                        <div class="texto-desarrollador">${categoria.aplicaciones[j].desarrollador}</div>
                        <div class="estrellas">
                            ${estrellas}
                        </div>
                        <div class="precio">
                            $${categoria.aplicaciones[j].precio}
                        </div>
                    </div>
                </div>
            </div>`
    );
  }
}

function seleccionarCategoria() {
  $("#aplicaciones").html("");
  console.log("Categoria seleccionada: " + $("#categoria").val());
  // imprimirAplicaciones(JSON.parse(localStorage.getItem($("#categoria").val())));
  imprimirAplicaciones(categorias[$("#categoria").val()]);
}
let numeroApp = -1;

function detalleAplicacion(codigoAplicacion) {
  //¿Cual es la aplicacion?
  $("#modal-detalle").modal("show");
  console.log("Categoria: " + $("#categoria").val());
  console.log("Codigo Aplicacion: " + codigoAplicacion);

  // let categoria = JSON.parse(localStorage.getItem($("#categoria").val()));
  let categoria = categorias[$("#categoria").val()];
  for (let i = 0; i < categoria.aplicaciones.length; i++) {
    if (codigoAplicacion == categoria.aplicaciones[i]._id) {
      numeroApp = i;
      $("#btnNuevoComentario").on("click", function () {
        addComentario(categorias[$("#categoria").val()]._id, codigoAplicacion);
      });
      let aplicacion = categoria.aplicaciones[i];
      console.log("----->Aplicación a mostrar en el modal: ");
      console.log(aplicacion);
      $("#nombre-app").html(aplicacion.nombre);
      $("#imagen-app").attr("src", aplicacion.icono);
      $("#desarrollador-app").html(aplicacion.desarrollador);
      $("#descripcion-app").html(aplicacion.descripcion);
      $("#comentarios").html("");
      for (let j = 0; j < aplicacion.comentarios.length; j++) {
        $("#comentarios").append(`<hr><div class="row comentario">
        <div class="col-2">
        <img src="img/user.webp" class="rounded-circle">
        </div>
        <div class="col-10">
        <b>${aplicacion.comentarios[j].usuario}</b>
        <p class="text-muted">${aplicacion.comentarios[j].comentario}</p>
        </div>
        </div>`);
      }

      $("#estrellas-app").html("");
      for (let j = 0; j < aplicacion.calificacion; j++) {
        $("#estrellas-app").append('<i class="fas fa-star"></i>');
      }
      for (let j = 0; j < 5 - aplicacion.calificacion; j++) {
        $("#estrellas-app").append('<i class="far fa-star"></i>');
      }
      if (aplicacion.calificacion >= 3) {
        $("#estrellas-app").removeClass("estrella-roja");
        $("#estrellas-app").addClass("estrella-verde");
      } else {
        $("#estrellas-app").removeClass("estrella-verde");
        $("#estrellas-app").addClass("estrella-roja");
      }
    }
  }
}

//NO BORRAR: Llenar selectlist de imagenes del formulario agregar aplicacion
(() => {
  for (let i = 1; i <= 50; i++)
    $("#icono").append(
      `<option value="img/app-icons/${i}.webp">${i}.webp</option>`
    );
  $("#icono").val(null);
})();

//NO BORRAR: Funcionalidad para mostrar la imagen del app al seleccionarla del select list
function visualizarImagen() {
  if ($("#icono").val() != "")
    $("#formImagenApp").attr("src", $("#icono").val());
  else $("#formImagenApp").attr("src", "img/app-icons/null.png");
}

const addComentario = async (idCategoria, idApp) => {
  if ($("#nuevoComentario").val()) {
    const resp = await fetch(
      `http://localhost:8888/api/${idCategoria}/${idApp}/addcomentario`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comentario: $("#nuevoComentario").val(),
          calificacion: 4,
          fecha: "12/12/2021",
          usuario: "kevin",
        }),
      }
    );
    const respJson = await resp.json();
    console.log(respJson);
    $("#nuevoComentario").val("");

    await reloadComentarios(idApp);
  }
};

const reloadComentarios = async (idApp) => {
  res = await fetch("http://localhost:8888/api/categorias").catch((err) =>
    console.log("No se obtuvieron las categorias", err)
  );
  categorias = await res.json();
  console.log(categorias);
  // detalleAplicacion(idApp);

  $("#comentarios").html("");
  for (
    let j = 0;
    j <
    categorias[$("#categoria").val()].aplicaciones[numeroApp].comentarios
      .length;
    j++
  ) {
    $("#comentarios").append(`<hr><div class="row comentario">
        <div class="col-2">
        <img src="img/user.webp" class="rounded-circle">
        </div>
        <div class="col-10">
        <b>${
          categorias[$("#categoria").val()].aplicaciones[numeroApp].comentarios[
            j
          ].usuario
        }</b>
        <p class="text-muted">${
          categorias[$("#categoria").val()].aplicaciones[numeroApp].comentarios[
            j
          ].comentario
        }</p>
        </div>
        </div>`);
  }

  // $("#aplicaciones").html("");
  // imprimirAplicaciones(categorias[$("#categoria").val()]);
};

const addApp = async () => {
  const idCategoria = categorias[$("#categoria").val()]._id;
  const nuevaApp = {
    nombre: $("#nombre").val(),
    descripcion: $("#descripcion").val(),
    icono: $("#icono").val(),
    instalada: true,
    app: "app/demo.apk",
    calificacion: $("#calificacion").val(),
    descargas: $("#descargas").val(),
    precio: $("#precio").val(),
    desarrollador: $("#desarrollador").val(),
    imagenes: [
      "img/app-screenshots/1.webp",
      "img/app-screenshots/2.webp",
      "img/app-screenshots/3.webp",
    ],
    comentarios: [
      {
        _id: "63003e5972f8db6bdbc61b21",
        comentario:
          "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        calificacion: 3,
        fecha: "12/12/2012",
        usuario: "Juan",
      },
      {
        _id: "63003e5972f8db6bdbc61b63",
        comentario:
          "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        calificacion: 3,
        fecha: "12/12/2012",
        usuario: "Pedro",
      },
      {
        _id: "63003e5972f8db6bdbc61b2a",
        comentario:
          "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        calificacion: 4,
        fecha: "12/12/2012",
        usuario: "Maria",
      },
    ],
  };
  resPut = await fetch(`http://localhost:8888/api/${idCategoria}/addapp`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaApp),
  });
  resPutJson = await resPut.json();

  console.log(resPutJson);

  res = await fetch("http://localhost:8888/api/categorias").catch((err) =>
    console.log("No se obtuvieron las categorias", err)
  );
  categorias = await res.json();

  $("#aplicaciones").html("");
  imprimirAplicaciones(categorias[$("#categoria").val()]);
};
