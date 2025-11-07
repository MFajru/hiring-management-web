import Image from "next/image";

const NoCandidate = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-6">
      <Image
        src={"/empyCandidate.png"}
        alt="Empty candidate"
        height={276}
        width={260}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-center font-bold">No candidates found</h3>
        <p className="text-center text-gray-500 text-sm">
          Share your job vacancies so that more candidates will apply.
        </p>
      </div>
    </div>
  );
};

export default NoCandidate;
