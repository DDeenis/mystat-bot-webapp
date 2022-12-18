import { NextPage } from "next";
import { ActionButton } from "../components/ActionButton/ActionButton";
import { ActionsSection } from "../components/ActionsSection/ActionsSection";
import { UserInfoBar } from "../components/UserInfoBar/UserInfoBar";
import { paths } from "../utils/routes";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.mystat.profile.useQuery();

  return (
    <>
      {data?.success && <UserInfoBar userInfo={data?.data} />}
      <ActionsSection header={"Расписание"}>
        <ActionButton path={paths.schedule.today}>На сегодня</ActionButton>
        <ActionButton path={paths.schedule.tomorrow}>На завтра</ActionButton>
      </ActionsSection>
      <ActionsSection header={"Домашние задания"}>
        <ActionButton path={paths.homework}>
          Посмотреть домашние задания
        </ActionButton>
      </ActionsSection>
      <ActionsSection header={"Экзамены"}>
        <ActionButton path={paths.exams.future}>Назначенные</ActionButton>
        <ActionButton path={paths.exams.all}>Все</ActionButton>
      </ActionsSection>
      <ActionsSection header={"Разное"}>
        <ActionButton path={paths.group}>Группа и поток</ActionButton>
        <ActionButton path={paths.news.allNews}>Новости</ActionButton>
        <ActionButton path={paths.info}>Информация о себе</ActionButton>
        <ActionButton path={paths.reviews}>Отзывы</ActionButton>
        <ActionButton path={paths.settings}>
          Настройки и иноформация о сайте
        </ActionButton>
      </ActionsSection>
    </>
  );
};

export default Home;
