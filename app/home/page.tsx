import { ActionButton } from "../../components/ActionButton/ActionButton";
import { ActionsSection } from "../../components/ActionsSection/ActionsSection";
import { UserInfoBar } from "../../components/UserInfoBar/UserInfoBar";
import { paths } from "../../utils/routes";
import { getProfile } from "../../server/actions";

export default async function Home() {
  const profile = await getProfile();

  return (
    <>
      {profile && <UserInfoBar userInfo={profile} />}
      <ActionsSection header={"Расписание"}>
        <ActionButton prefetch={true} path={paths.schedule.today}>
          На сегодня
        </ActionButton>
        <ActionButton prefetch={true} path={paths.schedule.tomorrow}>
          На завтра
        </ActionButton>
      </ActionsSection>
      <ActionsSection header={"Домашние задания"}>
        <ActionButton prefetch={true} path={paths.homework}>
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
        <ActionButton path={paths.info}>Информация о себе</ActionButton>
        <ActionButton path={paths.reviews}>Отзывы</ActionButton>
        <ActionButton path={paths.settings}>Информация о сайте</ActionButton>
      </ActionsSection>
    </>
  );
}
