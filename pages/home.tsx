import { NextPage } from "next";
import { ActionButton } from "../components/ActionButton/ActionButton";
import { ActionsSection } from "../components/ActionsSection/ActionsSection";
import { paths } from "../utils/routes";

const Home: NextPage = () => {
  return (
    <>
      <ActionsSection header={"Расписание"}>
        <ActionButton path={paths.schedule.today}>На сегодня</ActionButton>
        <ActionButton path={paths.schedule.tomorrow}>На завтра</ActionButton>
        <ActionButton path={paths.schedule.month}>На месяц</ActionButton>
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
        <ActionButton path={paths.news}>Новости</ActionButton>
        <ActionButton path={paths.group}>Группа</ActionButton>
        <ActionButton path={paths.info}>Информация о себе</ActionButton>
        <ActionButton path={paths.info}>О боте</ActionButton>
      </ActionsSection>
    </>
  );
};

export default Home;
