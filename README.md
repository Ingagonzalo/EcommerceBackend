# EcommerceBackend

## Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

- El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.

- Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

## Desafío 19

- Dividir en capas el proyecto entregable con el que venimos trabajando (entregable clase 16: loggers y profilers),
  agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.

- Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa
  de persistencia.

- La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los
  propios datos.
