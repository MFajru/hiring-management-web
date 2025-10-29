import InputLabel from "@/components/customUI/input-with-label";
import React from "react";

const Tttt = () => {
  return (
    <div>
      <form action="">
        <InputLabel
          inputId="jobName"
          inputType="text"
          label="Job Name"
          placeholder="Ex. Front End Engineer"
        />
        <InputLabel
          inputId="numOfCandidate"
          inputType="text"
          label="Number of Candidate Needed"
          placeholder="Ex. 2"
        />
      </form>
    </div>
  );
};

export default Tttt;
