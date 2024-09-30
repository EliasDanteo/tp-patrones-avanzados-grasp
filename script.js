// Clase de Fabricación Pura: Logger
class Logger {
  static logTransaction(paymentType, amount) {
    console.log(`Transacción registrada: ${paymentType}, Monto: $${amount}`);
  }
}

// Interface común para los procesadores de pago
class ProcesadorDePago {
  procesarPago(monto) {
    throw new Error("Este método debe ser implementado por una subclase.");
  }
}

// Procesador de Tarjeta de Crédito
class ProcesadorCredito extends ProcesadorDePago {
  procesarPago(monto) {
    return `Pago de $${monto} procesado con tarjeta de crédito.`;
  }
}

// Procesador de PayPal
class ProcesadorPayPal extends ProcesadorDePago {
  procesarPago(monto) {
    return `Pago de $${monto} procesado con PayPal.`;
  }
}

// Procesador de Transferencia Bancaria
class ProcesadorBancario extends ProcesadorDePago {
  procesarPago(monto) {
    return `Pago de $${monto} procesado con transferencia bancaria.`;
  }
}
// Clase Factory para obtener el procesador de pago adecuado
class ProcesadorDePagoFactory {
  static obtenerProcesador(tipoPago) {
    const procesadores = {
      credit: new ProcesadorCredito(),
      paypal: new ProcesadorPayPal(),
      bank: new ProcesadorBancario(),
    };

    const procesador = procesadores[tipoPago];
    if (!procesador) {
      throw new Error("Tipo de pago no soportado.");
    }
    return procesador;
  }
}

// Manejador del evento de envío del formulario
document.getElementById('paymentForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const tipoPago = document.getElementById('paymentType').value;
  const monto = document.getElementById('amount').value;

  // Validar si el monto es un número positivo
  if (monto <= 0 || isNaN(monto)) {
    document.getElementById('result').textContent = "Por favor, ingrese un monto válido.";
    return;
  }

  const procesador = ProcesadorDePagoFactory.obtenerProcesador(tipoPago); // Obtener el procesador de pago
  Logger.logTransaction(tipoPago, monto); // Registrar la transacción
  const resultado = procesador.procesarPago(monto); // Procesar el pago

  document.getElementById('result').textContent = resultado;
});
