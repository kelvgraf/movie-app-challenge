import { Typography } from "@/components/typography";
type IInfoDeatilProps = {
  label: string;
  infoDetail: string | number;
};

function InfoMovieDetail({ label, infoDetail }: IInfoDeatilProps) {
  return (
    <div className="w-max h-fit flex flex-col p-4 rounded-[4px] bg-mauve-dark-3/80  dark:bg-mauve-dark-8">
      <Typography
        text={label}
        className="text-[12px] font-bold text-mauve-dark-11 opacity-70"
        variant="p"
      />
      <Typography
        text={infoDetail}
        className="text-[12px] font-semibold text-white"
        variant="p"
      />
    </div>
  );
}
export { InfoMovieDetail };
