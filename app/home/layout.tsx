import { ActionButton } from "../../components/ActionButton/ActionButton";
import { ActionsSection } from "../../components/ActionsSection/ActionsSection";
import { paths } from "../../utils/routes";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ActionsSection header={"Расписание"}>
        <ActionButton prefetch={true} path={paths.schedule.today}>
          На сегодня
        </ActionButton>
        <ActionButton prefetch={true} path={paths.schedule.tomorrow}>
          На завтра
        </ActionButton>
      </ActionsSection>
      <ActionsSection header={"Домашние задания"}>
        <ActionButton prefetch={true} path={paths.homework.list.default}>
          Посмотреть домашние задания
        </ActionButton>
      </ActionsSection>
      <ActionsSection header={"Экзамены"}>
        <ActionButton prefetch={true} path={paths.exams.future}>
          Назначенные
        </ActionButton>
        <ActionButton path={paths.exams.all}>Все</ActionButton>
      </ActionsSection>
      <ActionsSection header={"Разное"}>
        <ActionButton path={paths.leaders.group}>Группа и поток</ActionButton>
        <ActionButton path={paths.news.allNews}>Новости</ActionButton>
        <ActionButton path={paths.info}>Профиль</ActionButton>
        <ActionButton path={paths.reviews}>Отзывы</ActionButton>
        <ActionButton path={paths.settings}>Информация о сайте</ActionButton>
      </ActionsSection>
    </>
  );
}
