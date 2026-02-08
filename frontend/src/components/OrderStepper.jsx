const OrderStepper = ({ currentStep }) => {
  const steps = ["Cart", "Address", "Payment"];

  return (
    <div className="container stepper-container">
      <div className="d-flex justify-content-center mt-3">
        <div className="prime-stepper w-100">
          {steps.map((label, index) => {
            const step = index + 1;
            const completed = step < currentStep;
            const active = step === currentStep;

            return (
              <div className="step-wrapper " key={label}>
                <div className="step-item">
                  <div
                    className={`step-circle 
                  ${completed ? "completed" : active ? "active" : ""}
                `}
                  >
                    {completed ? "✓" : step}
                  </div>

                  <span
                    className={`step-label 
                  ${completed ? "completed-text" : active ? "active-text" : ""}
                `}
                  >
                    {label}
                  </span>
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`step-line ${completed ? "line-completed" : ""}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderStepper;
