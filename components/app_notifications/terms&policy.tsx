import { FlatList, Modal, ScrollView, Text, VStack } from "native-base";
import * as React from "react";
import Section from "./section-t-c";

type TNotification = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TermsPolicyModal({ openModal, setOpenModal }: TNotification) {
  const sections = [
    {
      title: "Datos Personales",
      content:
        "En el marco de nuestra política de privacidad, llevamos a cabo una gestión meticulosa de tus datos personales. Nos comprometemos a resguardar su confidencialidad y seguridad en todo momento. Implementamos tecnologías y medidas de seguridad avanzadas para garantizar la integridad y protección de la información que nos confías.",
    },
    {
      title: "Privacidad y Seguridad",
      content:
        "La privacidad de nuestros usuarios es una prioridad fundamental. Para asegurar un entorno seguro, hemos implementado protocolos de seguridad robustos. Nuestro compromiso es mantener un alto estándar de protección y confidencialidad en cada interacción que tengas con nuestra plataforma. Valoramos la confianza que depositas en nosotros y trabajamos incansablemente para preservarla.",
    },
    {
      title: "Uso de Cookies",
      content:
        "Queremos informarte sobre nuestro uso de cookies. Estas pequeñas piezas de información nos permiten mejorar tu experiencia en nuestra plataforma. Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración de tu cuenta. A través de este mecanismo, personalizamos tu experiencia para proporcionarte un servicio más adaptado a tus necesidades y preferencias individuales.",
    },
    {
      title: "Consentimiento Informado",
      content:
        "Consentimiento Informado: Al utilizar nuestros servicios, otorgas tu consentimiento informado para el procesamiento de datos de acuerdo con nuestras políticas de privacidad. Este consentimiento es esencial para proporcionarte nuestros servicios de manera eficaz y personalizada. Queremos asegurarnos de que estés plenamente informado sobre cómo utilizamos y protegemos tus datos personales.",
    },
    {
      title: "Transparencia",
      content:
        "Nos comprometemos a operar con transparencia y responsabilidad en todas nuestras prácticas relacionadas con la privacidad y la seguridad de los datos. Buscamos crear un entorno en el que nuestros usuarios confíen plenamente en la forma en que manejamos su información. Estamos aquí para responder a tus preguntas y brindarte la información que necesitas para sentirte seguro y protegido al utilizar nuestros servicios.",
    },
  ];
  return (
    <ScrollView nestedScrollEnabled>
      <Modal
        isOpen={openModal}
        _backdropFade={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        animationPreset="slide"
        backdropVisible={true}
        size="xl"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Content rounded={30} className="p-5 bg-white">
          <Modal.CloseButton rounded={15} />
          <Modal.Body className="space-y-10">
            <VStack space={4}>
              <Text className="font-semibold text-xl">
                Términos y Condiciones
              </Text>
              <VStack space={5}>
                <Text className="text-gray-500">
                  Bienvenido a la plataforma de la aplicación móvil de{" "}
                  <Text className="font-semibold text-black">
                    Expense Tracker SaaS
                  </Text>
                  . El objetivo de esta aplicación es facilitar el acceso a los
                  servicios de Expense Tracker y a la información relacionada
                  con los mismos, así como la realización de operaciones
                  relacionadas con la aplicación. El uso de esta aplicación se
                  rige por los términos y condiciones que se describen a
                  continuación, clasificados por secciones.
                </Text>
              </VStack>
            </VStack>

            <FlatList
              data={sections}
              renderItem={({ item }) => (
                <Section title={item.title} content={item.content} />
              )}
              keyExtractor={(index) => index.toString()}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}
