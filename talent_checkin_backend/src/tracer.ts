import tracer from "dd-trace";
tracer.init({ service: "talent-checkin-backend" }); // initialized in a different file to avoid hoisting.
export default tracer;
